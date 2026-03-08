import { supabase } from "../../config/supabase";

export class StorageUtils {
  static async uploadFile(bucket: string, buffer: Buffer, path: string, contentType: string): Promise<string> {
    const { error } = await supabase.storage.from(bucket).upload(path, buffer, {
      contentType,
      upsert: true,
    });

    if (error) throw new Error(`Upload failed: ${error.message}`);

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  static async deleteFile(bucket: string, path: string): Promise<void> {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) throw new Error(`Delete failed: ${error.message}`);
  }

  static getPublicUrl(bucket: string, path: string): string {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }
}
