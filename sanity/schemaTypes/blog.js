export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: "Titre de l'article",
    },
    {
      name: 'slug',
      type: 'slug',
      title: "Slug de l'article",
      options: {
        source: 'title',
      },
    },
    {
      name: 'titleImage',
      type: 'image',
      title: 'Image du titre',
    },
    {
      name: 'description',
      type: 'text',
      title: "Description de l'article",
    },
    {
      name: 'content',
      type: 'array',
      title: 'Contenu',
      of: [
        {
          type: 'block',
        },
      ],
    },
  ],
}
