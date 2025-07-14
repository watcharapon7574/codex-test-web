import { supabase } from "@/lib/supabaseClient";

// ---------- CONSTANTS ----------
const CLOUDCONVERT_API_URL = "https://api.cloudconvert.com/v2/jobs";
const CLOUDCONVERT_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjE5MmI3ZjlkY2U4MmExMmFlNjM2MDY5MzFiMzVlYTMwMTVkMTcyMzBkZWE1ZmEzZWIxOWMyNzJjNzVlOTNmZGFmMjBmNDFjYTE5N2FiZGMiLCJpYXQiOjE3NTIwNDUwMDcuMzI5NzA2LCJuYmYiOjE3NTIwNDUwMDcuMzI5NzA4LCJleHAiOjQ5MDc3MTg2MDcuMzIyNTk1LCJzdWIiOiI3MjM5MzA0OCIsInNjb3BlcyI6WyJ0YXNrLndyaXRlIiwidGFzay5yZWFkIl19.BXlwpMraz0vWYwg964ibwRTBfbtAWPZIhoDZTFDHoQplB4ojbgxC4Hm9lJUaFpkUrZvrVT3n0wy_AYupEaiNyIdjiMtt5locQXU2dhIKQaNfnfsadtuMooR7zPnnIac-VM5Z834o7xOWm0W2sw3KlFfKB2fkUvEGXIsBI-pCscgM2nIDXgj2ckbPEIfqzJozDCGVs952wrND-wLJfhpRyCMaz4az6VGzF0UWsx9OoBCpM0ufys0JW6yWOhLe923_WuptmdmCU3hlK3Sp5sFUc0tcmZeU8Raro8D5kkE75fY47wFsRaU2kw2JiAzjcIXcC26rAweCEdrxsIWu_ykKQ-_o3HyqfCYuKijgPZNhjOM0H2-Gixa8nfme_YBFQ0ng-3kEl4JI7KBRmPCMHe9ky0zCHY55SEB2S9pQOVzzl2N4UpwTk00fpHCJmh61-mOlftYXOdbN4LBBlv-gREoMzIc06qRXDBYb7YydN1vuv8xsQZWyKFDKoRaq2ccXrxnU-6MnLRwhDW_SMDV4-3lVHvhHuCCBdOjgbYnrN4PuB--caeznkAD9s2ULFl-qnmg9TxYMT55ueEcey2EHBGYInLJSWRGkhgUosmxoYhW03YV9toQk4S0j0ErgzaFDbv_7bQh_IXNkRbK-RiNlp2vykJ3HeV4P1W9ItKVuF_yt25o";

interface FileInfo {
  url: string;
}

interface Task {
  id: string;
  operation: string;
  result?: {
    form?: {
      url: string;
      parameters: Record<string, string>;
    };
    files?: FileInfo[];
  };
}

interface JobData {
  id: string;
  status: string;
  tasks: Record<string, Task>;
}

export async function convertHeicToJpg(file: File): Promise<File> {
  const jobRes = await fetch(CLOUDCONVERT_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CLOUDCONVERT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tasks: {
        importFile: { operation: "import/upload" },
        convertFile: {
          operation: "convert",
          input: "importFile",
          input_format: "heic",
          output_format: "jpg",
          engine: "imagemagick",
        },
        exportFile: {
          operation: "export/url",
          input: "convertFile",
        },
      },
    }),
  });

  const jobData = (await jobRes.json()) as { data: JobData };
  const importTask = Object.values(jobData.data.tasks).find(
    (t) => t.operation === "import/upload"
  );
  if (!importTask?.result?.form) throw new Error("No import/upload task");
  const uploadUrl = importTask.result.form.url;
  const uploadParams = importTask.result.form.parameters;

  const formData = new FormData();
  Object.entries(uploadParams).forEach(([k, v]) => formData.append(k, v));
  formData.append("file", file);
  await fetch(uploadUrl, { method: "POST", body: formData });

  let status = "processing";
  let resultUrl = "";
  while (status !== "finished") {
    await new Promise((r) => setTimeout(r, 1200));
    const pollRes = await fetch(`${CLOUDCONVERT_API_URL}/${jobData.data.id}`, {
      headers: { Authorization: `Bearer ${CLOUDCONVERT_TOKEN}` },
    });
    const pollJob = (await pollRes.json()) as { data: JobData };
    status = pollJob.data.status;
    const exportTask = Object.values(pollJob.data.tasks).find(
      (t) => t.operation === "export/url" && t.result?.files?.[0]?.url
    );
    if (exportTask && exportTask.result?.files) {
      resultUrl = exportTask.result.files[0].url;
      break;
    }
  }

  const jpgResp = await fetch(resultUrl);
  const jpgBlob = await jpgResp.blob();
  return new File([jpgBlob], file.name.replace(/\.heic$/i, ".jpg"), { type: "image/jpeg" });
}

export async function uploadAboutImage(file: File, path: string): Promise<string> {
  const { error } = await supabase.storage.from("about").upload(path, file, { upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from("about").getPublicUrl(path);
  return data.publicUrl;
}

export async function convertAndUploadToSupabase(file: File, path: string): Promise<string> {
  const jpgFile = await convertHeicToJpg(file);
  return await uploadAboutImage(jpgFile, path);
}