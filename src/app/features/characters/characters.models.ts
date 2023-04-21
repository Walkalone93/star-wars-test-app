export interface CharactersResponse {
    message: string;
    total_records: number;
    total_pages: number;
    previous: string | null;
    next: string | null;
    results: CharacterResponse[];
}

export interface CharacterResponse {
    uid: string;
    name: string;
    url: string;
}

export interface CharacterDetailsResponse {
    message: string;
    result: {
        description: string;
        uid: string;
        properties: CharacterPropertiesResponse;
        _id: string;
        __v: number
    };
}

export interface CharacterPropertiesResponse {
    height: string;
    mass: string;
    hair_color: string;
    eye_color: string;
    skin_color: string;
    birth_year: string;
    gender: string;
    created: string;
    edited: string;
    name: string;
    homeworld: string;
    url: string;
}

export interface Character {
    uid: string;
    name: string;
    url: string;
    details?: CharacterDetails;
}

export interface CharacterDetails extends CharacterPropertiesResponse {
    uid: string;
    description: string;
}
