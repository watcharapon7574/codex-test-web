import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bkcqeoiwipcibmhxwwgm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrY3Flb2l3aXBjaWJtaHh3d2dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NzE1MTQsImV4cCI6MjA2NzU0NzUxNH0.MlafYhdCPuFIIvGtWhf88F3OY1RK42mfkQrseWxqMsE';

export const supabase = createClient(supabaseUrl, supabaseKey);