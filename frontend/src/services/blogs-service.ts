export const BlogService = {
  getAllBlogs: async () => {
    const res = await fetch(`/blogs.json`, {
       next: { revalidate: 60 }, 
    });

    if (!res.ok) {
      throw new Error('Failed to fetch blogs');
    }

    const data = await res.json();
    return data;
  },
};