/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAlbumCategory = /* GraphQL */ `
  subscription OnCreateAlbumCategory {
    onCreateAlbumCategory {
      id
      title
      albums {
        items {
          id
          name
          by
          numberOfLikes
          imageUri
          artistsHeadline
          albumCategoryId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAlbumCategory = /* GraphQL */ `
  subscription OnUpdateAlbumCategory {
    onUpdateAlbumCategory {
      id
      title
      albums {
        items {
          id
          name
          by
          numberOfLikes
          imageUri
          artistsHeadline
          albumCategoryId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAlbumCategory = /* GraphQL */ `
  subscription OnDeleteAlbumCategory {
    onDeleteAlbumCategory {
      id
      title
      albums {
        items {
          id
          name
          by
          numberOfLikes
          imageUri
          artistsHeadline
          albumCategoryId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateAlbum = /* GraphQL */ `
  subscription OnCreateAlbum {
    onCreateAlbum {
      id
      name
      by
      numberOfLikes
      imageUri
      artistsHeadline
      songs {
        items {
          id
          imageUri
          uri
          title
          artist
          albumId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      albumCategoryId
      albumCategory {
        id
        title
        albums {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAlbum = /* GraphQL */ `
  subscription OnUpdateAlbum {
    onUpdateAlbum {
      id
      name
      by
      numberOfLikes
      imageUri
      artistsHeadline
      songs {
        items {
          id
          imageUri
          uri
          title
          artist
          albumId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      albumCategoryId
      albumCategory {
        id
        title
        albums {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAlbum = /* GraphQL */ `
  subscription OnDeleteAlbum {
    onDeleteAlbum {
      id
      name
      by
      numberOfLikes
      imageUri
      artistsHeadline
      songs {
        items {
          id
          imageUri
          uri
          title
          artist
          albumId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      albumCategoryId
      albumCategory {
        id
        title
        albums {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateSong = /* GraphQL */ `
  subscription OnCreateSong {
    onCreateSong {
      id
      imageUri
      uri
      title
      artist
      albumId
      album {
        id
        name
        by
        numberOfLikes
        imageUri
        artistsHeadline
        songs {
          nextToken
          __typename
        }
        albumCategoryId
        albumCategory {
          id
          title
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateSong = /* GraphQL */ `
  subscription OnUpdateSong {
    onUpdateSong {
      id
      imageUri
      uri
      title
      artist
      albumId
      album {
        id
        name
        by
        numberOfLikes
        imageUri
        artistsHeadline
        songs {
          nextToken
          __typename
        }
        albumCategoryId
        albumCategory {
          id
          title
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteSong = /* GraphQL */ `
  subscription OnDeleteSong {
    onDeleteSong {
      id
      imageUri
      uri
      title
      artist
      albumId
      album {
        id
        name
        by
        numberOfLikes
        imageUri
        artistsHeadline
        songs {
          nextToken
          __typename
        }
        albumCategoryId
        albumCategory {
          id
          title
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
