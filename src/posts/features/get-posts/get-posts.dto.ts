export class GetPostsDto {
  constructor(public readonly posts: PostDto[]) {}
}
export interface PostDto {
  id: string;
  creatorId: string;
  creatorName: string;
  content: string;
  tags: string[];
  createdAt: Date;
}
