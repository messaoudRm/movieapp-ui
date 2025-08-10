export class Movie {
  constructor(
    public id: number,
    public releaseDate: string | null,
    public title: string | null,
    public overview: string | null,
    public popularity: number | null,
    public voteCount: number | null,
    public voteAverage: number | null,
    public originalLanguage: string | null,
    public genre: string | null,
    public posterUrl: string | null,
  ) {}


  static fromJson(movieJson: any): Movie {
    return new Movie(
      movieJson.id,
      movieJson.releaseDate ?? null,
      movieJson.title ?? null,
      movieJson.overview ?? null,
      movieJson.popularity ?? null,
      movieJson.voteCount ?? null,
      movieJson.voteAverage ?? null,
      movieJson.originalLanguage ?? null,
      movieJson.genre ?? null,
      movieJson.posterUrl ?? null,
    );
  }

}
