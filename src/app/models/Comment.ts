import {User} from './User';
import {Movie} from './Movie';

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

  static fromJson(commentJson: any, movieData?: { id?: number; title?: string }): Comment {
    return new Comment(
      commentJson.id ?? 0,
      commentJson.userId ?? 0,
      commentJson.username ?? 'Inconnu',
      movieData?.id ?? 0,
      movieData?.title ?? '',
      commentJson.content ?? '',
      new Date(commentJson.createdAt ?? Date.now()),
      commentJson.sentimentLabel ?? 'NEUTRAL',
      commentJson.sentimentScore ?? 0
    );
  }
}

