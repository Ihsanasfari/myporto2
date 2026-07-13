import { apiFetch } from '../api-client';
import type { UploadSignRequest, UploadSignResponse } from '@/types/api';

export const uploadsApi = {
  sign: (data: UploadSignRequest) =>
    apiFetch<UploadSignResponse>('/api/uploads/sign', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export async function uploadImageToCloudinary(
  file: File,
  folder: string,
  publicId?: string,
): Promise<string> {
  const sig = await uploadsApi.sign({ folder, public_id: publicId });

  const form = new FormData();
  form.append('file', file);
  form.append('api_key', sig.api_key);
  form.append('timestamp', String(sig.timestamp));
  form.append('signature', sig.signature);
  form.append('folder', sig.folder);
  if (sig.public_id) form.append('public_id', sig.public_id);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${sig.cloud_name}/auto/upload`,
    { method: 'POST', body: form },
  );
  if (!res.ok) throw new Error('Cloudinary upload failed');
  const json = await res.json();
  return json.secure_url as string;
}
