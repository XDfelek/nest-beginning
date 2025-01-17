export default class GetPostsCommand {
  //to potrzebujemy w handlerze, zeby nie musieć pisać każdej rzeczy poniżej osobno
  constructor(
    public readonly creatorId?: string,
    public readonly minCreatedAt?: Date,
    public readonly maxCreatedAt?: Date,
  ) {}
}
