export default class CreatePostCommand {
  constructor(
    public readonly content: string,
    public readonly tags: string,
    public readonly userId: string,
  ) {}
}
