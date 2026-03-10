import { supabase } from "../../config/supabase";

export class StorageUtils {
  private static getClient() {
    if (!supabase) {
      throw new Error("Supabase storage is not configured");
    }

    return supabase;
  }

  static async uploadFile(
    bucket: string,
    buffer: Buffer,
    path: string,
    contentType: string,
  ): Promise<string> {
    const client = StorageUtils.getClient();

    const { error } = await client.storage.from(bucket).upload(path, buffer, {
      contentType,
      upsert: true,
    });

    if (error) throw new Error(`Upload failed: ${error.message}`);

    const { data } = client.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  static async deleteFile(bucket: string, path: string): Promise<void> {
    const client = StorageUtils.getClient();
    const { error } = await client.storage.from(bucket).remove([path]);
    if (error) throw new Error(`Delete failed: ${error.message}`);
  }

  static getPublicUrl(bucket: string, path: string): string {
    const client = StorageUtils.getClient();
    const { data } = client.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }
}
