export default class EditPostCommand {
  constructor(
    public readonly creatorId: string,
    public readonly postId: string,
    public readonly content?: string,
    public readonly tags?: string,
  ) {}
}
