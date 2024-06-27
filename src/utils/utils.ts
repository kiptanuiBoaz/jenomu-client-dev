import { baseGet } from "./apiClient";


export const updateLocalStorage = async (event_id: any) => {
  try {
    // Fetch the new value from the database
    // const response = await fetch(`your_database_endpoint/${event_id}`);
    const response = await baseGet(`main/v1/event/by_guid/${event_id}/`);
    console.log(response)
    // const newData = await response.json();

    console.log("here")
    console.log(response)

    // Set the new value in localStorage
    localStorage.setItem('current_event', JSON.stringify(response));


  } catch (error) {
    console.error('Error updating localStorage:', error);
  }
};

export const shortenUrl = async (long_url: any) => {

  let short_link = "";
  await fetch("https://api.tinyurl.com/create", {
    method: "POST",
    mode: "cors",
    headers: {
      // Authorization: `Bearer 7b2d9df389eabce12de4005ddf0b0af0f6459fc2`,
      Authorization: `Bearer QoNCKork7dQkP5WyfrvOb8t0LraRBzMc9niOnlfv6YSY92L7Yg72MeJTGTo1`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: long_url,
      domain: "tinyurl.com",
      // group_guid: `BnasguyLaOY`,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      short_link = data.data.tiny_url;

    });

  return short_link;
};

export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export const stringAvatar = (name: any) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
