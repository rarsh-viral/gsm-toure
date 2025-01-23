import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { file } = req.body;

    if (!file || !file.name || !file.buffer) {
      return res.status(400).json({ error: 'Invalid file data' });
    }

    const { data, error } = await supabase.storage
      .from('public')
      .upload(`${Date.now()}-${file.name}`, file.buffer)

    if (error) {
      console.error('Error uploading file:', error)
      return res.status(500).json({ error: 'Failed to upload file' })
    }

    if (!data || !data.path) {
      console.error('Upload response missing data or path')
      return res.status(500).json({ error: 'Failed to upload file' })
    }
    const { data: publicUrlData } = supabase.storage
    .from('public')
    .getPublicUrl(data.path)

  if (!publicUrlData || !publicUrlData.publicUrl) {
    console.error('Error getting image URL: No public URL returned')
    return res.status(500).json({ error: 'Failed to get image URL' })
  }

  res.status(200).json({ url: publicUrlData.publicUrl })
} catch (error) {
  console.error('Unexpected error:', error)
  res.status(500).json({ error: 'An unexpected error occurred' })
}
}