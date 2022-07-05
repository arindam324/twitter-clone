export type TweetProps = {
  id: string;
  img: string;
  name: string;
  username: string;
  comment: number;
  retweet: number;
  favorites: any;
  text: string;
  image?: string;
  video?: string;
  audio?: string;
  dateTime: string;
};

export const TweetData: TweetProps[] = [
  {
    id: "1",
    img: "https://i.pravatar.cc/150?img=25",
    name: "John Doe",
    username: "@johndoe",
    comment: 10,
    retweet: 40,
    favorites: ["1", "2"],
    dateTime: "12:04 PM . 12.04.2020",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates ullam nobis voluptatibus voluptatem cumque.",
  },
  {
    id: "2",
    img: "https://i.pravatar.cc/150?img=12",
    name: "John Doe",
    username: "@johndoe",
    comment: 10,
    retweet: 40,
    favorites: ["1", "2"],

    dateTime: "12:04 PM . 12.04.2020",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
  },
  {
    id: "3",
    img: "https://i.pravatar.cc/150?img=35",
    name: "John Doe",
    username: "@johndoe",
    comment: 10,
    retweet: 40,
    favorites: ["2"],
    dateTime: "12:04 PM . 12.04.2020",
    text: "akfdgklamdfg",
    image:
      "https://images.pexels.com/photos/10756534/pexels-photo-10756534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];
