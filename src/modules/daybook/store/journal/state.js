export default () => ({
  idLoading: true,
  entries: [
    {
      id: new Date().getTime(), //1699024500501
      date: new Date().toDateString(), //"Fri Nov 03 2023"
      text: "Do ut esse sint Lorem et veniam laboris laboris aute ad irure mollit.",
      picture: null,
    },
    {
      id: new Date().getTime() + 1000, //1699024500501
      date: new Date().toDateString(), //"Fri Nov 03 2023"
      text: "Dolor esse aliqua ipsum tempor non cillum dolor excepteur dolor velit.",
      picture: null,
    },
    {
      id: new Date().getTime() + 2000, //1699024500501
      date: new Date().toDateString(), //"Fri Nov 03 2023"
      text: "Ex mollit non ut deserunt quis sunt excepteur laborum exercitation occaecat.",
      picture: null,
    },
  ],
});
