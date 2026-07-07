import { apiClient, authHeader } from "./client";

export async function createPost(postPayload, token) {
  try {
    const response = await apiClient.post("/posts", postPayload, {
      headers: authHeader(token),
    });
    return [response.data, null];
  } catch (error) {
    console.error("Er ging iets mis bij het aanmaken van de post:", error);
    return [null, error.message];
  }
}

export async function addPostTag(postId, tagId, token) {
  try {
    const response = await apiClient.post(
      "/postTags",
      { postId, tagId },
      { headers: authHeader(token) },
    );
    return [response.data, null];
  } catch (error) {
    console.error("Er ging iets mis bij het koppelen van een tag:", error);
    return [null, error.message];
  }
}

export async function uploadPostImage(postId, image, token) {
  try {
    const formData = new FormData();
    formData.append("postId", postId);
    formData.append("image", image);
    const response = await apiClient.post("/postImages", formData, {
      headers: authHeader(token),
    });
    return [response.data, null];
  } catch (error) {
    console.error("Er ging iets mis bij het uploaden van een afbeelding:", error);
    return [null, error.message];
  }
}

export async function fetchTags() {
  try {
    const response = await apiClient.get("/tags");
    return [response.data, null];
  } catch (error) {
    console.error("Er ging iets mis bij het ophalen van de tags:", error);
    return [null, error.message];
  }
}

export async function fetchPosts() {
  try {
    const postsResponse = await apiClient.get("/posts");
    const usersResponse = await apiClient.get("/users");
    const commentsResponse = await apiClient.get("/comments");
    const tagsPostResponse = await apiClient.get("/postTags");
    const tagsResponse = await apiClient.get("/tags");
    const postImagesResponse = await apiClient.get("/postImages");

    const posts = postsResponse.data;
    const users = usersResponse.data;
    const comments = commentsResponse.data;
    const allPostTags = tagsPostResponse.data;
    const allTags = tagsResponse.data;
    const postImages = postImagesResponse.data;

    const merged = [];

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];

      const author = users.find((user) => user.id === post.authorId);
      const postComments = comments.filter(
        (comment) => comment.postId === post.id,
      );

      const postTags = allPostTags.filter((pt) => pt.postId === post.id);

      const tags = postTags.map((pt) => {
        const tag = allTags.find((t) => t.id === pt.tagId);
        return tag ? tag.name : null;
      });

      const coverImage = postImages.find((pi) => Number(pi.postId) === post.id);

      merged.push({
        id: post.id,
        title: post.title,
        description: post.description,
        likes: post.likes,
        image: coverImage ? coverImage.image : null,
        dateCreated: post.dateCreated,
        author: author,
        comments: postComments,
        tags: tags,
      });
    }

    merged.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
    return [merged, null];
  } catch (error) {
    console.error("Er ging iets mis bij het ophalen van de data:", error);
    return [null, error.message];
  }
}

export async function deletePost(id, token) {
  try {
    await apiClient.delete(`/posts/${id}`, {
      headers: authHeader(token),
    });
    return [true, null];
  } catch (error) {
    console.error("Er ging iets mis bij het verwijderen van de post:", error);
    return [null, error.message];
  }
}

export async function fetchPost(id) {
  try {
    const postResponse = await apiClient.get(`/posts/${id}`);
    const usersResponse = await apiClient.get("/users");
    const commentsResponse = await apiClient.get("/comments");
    const tagsPostResponse = await apiClient.get("/postTags");
    const tagsResponse = await apiClient.get("/tags");
    const postImagesResponse = await apiClient.get("/postImages");

    const post = postResponse.data;
    const users = usersResponse.data;
    const comments = commentsResponse.data;
    const allPostTags = tagsPostResponse.data;
    const allTags = tagsResponse.data;
    const postImages = postImagesResponse.data;

    const author = users.find((user) => user.id === post.authorId);
    const postComments = comments.filter(
      (comment) => comment.postId === post.id,
    );
    const commentsWithAuthors = postComments.map((comment) => {
      const commentAuthor = users.find((user) => user.id === comment.authorId);
      return {
        id: comment.id,
        postId: comment.postId,
        authorId: comment.authorId,
        content: comment.content,
        dateCreated: comment.dateCreated,
        author: commentAuthor,
      };
    });
    const postTags = allPostTags.filter((pt) => pt.postId === post.id);
    const tags = postTags.map((pt) => {
      const tag = allTags.find((t) => t.id === pt.tagId);
      return tag ? tag.name : null;
    });
    const allImages = postImages
      .filter((pi) => Number(pi.postId) === post.id)
      .map((pi) => pi.image);

    return [
      {
        id: post.id,
        title: post.title,
        description: post.description,
        likes: post.likes,
        images: allImages,
        dateCreated: post.dateCreated,
        author: author,
        comments: commentsWithAuthors,
        tags: tags,
        authorId: post.authorId,
      },
      null,
    ];
  } catch (error) {
    console.error("Er ging iets mis bij het ophalen van de data:", error);
    return [null, error.message];
  }
}

export async function updatePost(id, postPayload, token) {
  try {
    const response = await apiClient.put(`/posts/${id}`, postPayload, {
      headers: authHeader(token),
    });
    return [response.data, null];
  } catch (error) {
    console.error("Er ging iets mis bij het bijwerken van de post:", error);
    return [null, error.message];
  }
}

export async function fetchRawPost(id) {
  try {
    const response = await apiClient.get(`/posts/${id}`);
    return [response.data, null];
  } catch (error) {
    console.error("Er ging iets mis bij het ophalen van de post:", error);
    return [null, error.message];
  }
}

export async function fetchAllPostTags() {
  try {
    const response = await apiClient.get("/postTags");
    return [response.data, null];
  } catch (error) {
    console.error("Er ging iets mis bij het ophalen van de posttags:", error);
    return [null, error.message];
  }
}

export async function removePostTag(postTagId, token) {
  try {
    await apiClient.delete(`/postTags/${postTagId}`, {
      headers: authHeader(token),
    });
    return [true, null];
  } catch (error) {
    console.error("Er ging iets mis bij het verwijderen van een tag:", error);
    return [null, error.message];
  }
}

export async function fetchAllPostImages() {
  try {
    const response = await apiClient.get("/postImages");
    return [response.data, null];
  } catch (error) {
    console.error("Er ging iets mis bij het ophalen van de afbeeldingen:", error);
    return [null, error.message];
  }
}

export async function removePostImage(imageId, token) {
  try {
    await apiClient.delete(`/postImages/${imageId}`, {
      headers: authHeader(token),
    });
    return [true, null];
  } catch (error) {
    console.error(
      "Er ging iets mis bij het verwijderen van een afbeelding:",
      error,
    );
    return [null, error.message];
  }
}

export async function fetchUserPosts(userId) {
  try {
    const postsResponse = await apiClient.get(`/users/${userId}/posts`);
    const commentsResponse = await apiClient.get("/comments");
    const tagsPostResponse = await apiClient.get("/postTags");
    const tagsResponse = await apiClient.get("/tags");
    const postImagesResponse = await apiClient.get("/postImages");

    const posts = postsResponse.data;
    const comments = commentsResponse.data;
    const allPostTags = tagsPostResponse.data;
    const allTags = tagsResponse.data;
    const postImages = postImagesResponse.data;

    const merged = posts.map((post) => {
      const postComments = comments.filter(
        (comment) => comment.postId === post.id,
      );
      const postTags = allPostTags.filter((pt) => pt.postId === post.id);
      const tags = postTags.map((pt) => {
        const tag = allTags.find((t) => t.id === pt.tagId);
        return tag ? tag.name : null;
      });
      const coverImage = postImages.find(
        (pi) => Number(pi.postId) === post.id,
      );

      return {
        id: post.id,
        title: post.title,
        description: post.description,
        likes: post.likes,
        image: coverImage ? coverImage.image : null,
        dateCreated: post.dateCreated,
        author: { id: userId },
        comments: postComments,
        tags: tags,
      };
    });

    return [merged, null];
  } catch (error) {
    console.error("Er ging iets mis bij het ophalen van je posts:", error);
    return [null, error.message];
  }
}
