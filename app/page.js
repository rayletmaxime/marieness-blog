import { Card, CardContent } from "@/components/ui/card";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 30; //30 sec revalidate

async function getData() {
  const query = `*[_type == 'blog'] | order(_createdAt desc) {
  title,
    description,
    "currentSlug": slug.current,
    titleImage
}`;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
      {data.map((post, idx) => (
        <Card key={idx}>
          <Image
            src={urlFor(post.titleImage).url()}
            alt="Image"
            width={550}
            height={500}
            className="rounded-t-lg h-[200px] object-cover w-full"
          />
          <CardContent className="mt-5">
            <h3 className="text-lg line-clamp-2 font-semibold">{post.title}</h3>
            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
              {post.description}
            </p>
            <Button asChild className="w-full mt-7">
              <Link href={`/blog/${post.currentSlug}`}>Lire plus</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
