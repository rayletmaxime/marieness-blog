import Footer from "@/app/components/Footer";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";

export const revalidate = 30; //30 sec revalidate

async function getData(slug) {
  const query = `
  *[_type == "blog" && slug.current == '${slug}'] {
  "currentSlug": slug.current,
    title,
    content,
    titleImage
}[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({ params, slug }) {
  const data = await getData(params.slug);

  return (
    <>
      <div className="mt-8">
        <h1>
          <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
            Marie Ness - Blog
          </span>
          <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
            {data.title}
          </span>
        </h1>
        <div className="flex justify-center">
          <Image
            src={urlFor(data.titleImage).url()}
            width={800}
            height={800}
            alt="Image de l'article"
            priority
            className="rounded-lg mt-8 border"
          />
        </div>

        <div className="my-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
          <PortableText value={data.content} />
        </div>
      </div>
      <Footer />
    </>
  );
}
