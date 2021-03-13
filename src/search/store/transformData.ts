import { Person, Response } from "./types";

type TransformedResponse = {
  count: number;
  options: Person[];
}

export function transformData(data: Response): TransformedResponse {
  return {
    count: data.count,
    options: data.results.map((item) => ({
      name: item.name,
      height: Number(item.height),
      mass: Number(item.mass),
      hairColor: item.hair_color,
      skinColor: item.skin_color,
      eyeColor: item.eye_color,
      birthYear: item.birth_year,
      gender: item.gender,
    }))
  };
}
