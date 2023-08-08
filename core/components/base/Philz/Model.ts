export interface Product {
    title: string;
    subtitle: string;
    color1: string;
    color2: string;
    picture: number;
  }
  
  export const products = [
    {
      title: "Nike Air Max 90 Futura",
      subtitle: "The Nike Air Max 90 Futura reimagines the icon of Air",
      color1: "#D0C5C3",
      color2: "#f1f2f6",
      picture: require("@/assets/demoimage/airmax.png"),
      aspectRatio: 1,
      scale: 1.42,
    },

    {
      title: "Zion 2",
      subtitle: "Channel new levels of speed and power in shoes designed for Zion",
      color1: "#FEB829",
      color2: "#FDD446",
      picture: require("@/assets/demoimage/zion.png"),
      aspectRatio: 1,
      scale: 1.42,

    },
      
    {
      title: "Air Jordan 3 Retro SE",
      subtitle: "The AJ3 returns, this time in an interplanetary colorway",
      color1: "#CBCED4",
      color2: "white",
      picture: require("@/assets/demoimage/airjordan.png"),
      aspectRatio: 1,
      scale: 1.42,

    },
    {
      title: "Jumpman Two Trey",
      subtitle: "Flaky perfection, baked fresh daily",
      color1: "#E2DDD1",
      color2: "#F3F1ED",
      picture: require("@/assets/demoimage/jumpman.png"),
      aspectRatio: 1,
      scale: 1.42,

    },
  ];