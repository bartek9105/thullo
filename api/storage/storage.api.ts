import { v4 as uuid } from "uuid";
import { supabase } from "../../utils/supabaseClient";

export const uploadFile = async (bucket: string, file: File) => {
  const fileName = `${file.name}${uuid()}`;

  await supabase.storage.from(bucket).upload(fileName, file, {
    cacheControl: "3600",
    upsert: false,
  });

  return `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/${fileName}`;
};
