export class Comment {
  constructor(
    public id: number,
    public userId: number,
    public username: string,
    public movieId: number,
    public movieTitle: string,
    public content: string,
    public createdAt: Date,
    public sentimentLabel: string,
    public sentimentScore: number
  ) {}

  static fromJson(commentJson: any): Comment {
    return new Comment(
      commentJson.id ?? 0,
      commentJson.userId ?? 0,
      commentJson.username ?? 'Inconnu',
      commentJson.movieId ?? 0,
      commentJson.movieTitle ?? '',
      commentJson.content ?? '',
      new Date(commentJson.createdAt ?? Date.now()),
      commentJson.sentimentLabel ?? 'NEUTRAL',
      commentJson.sentimentScore ?? 0
    );
  }
}
