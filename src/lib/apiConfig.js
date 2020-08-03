const api_all_music = () => { return "/api/all_music"; }
const api_music = (music_id) => { return "/api/music?id=" + music_id; };
const api_collect_list = () => { return "/api/collect_list"; }
const api_list = (list_id) => { return "/api/list?id=" + list_id; };
const api_status = (music_id) => { return "/api/status?id=" + music_id; };
const api_add = () => { return "/api/add"; }
const api_remove = () => { return "/api/remove"; }

const music_file_url = "/public/music";
const music_image_url = "/public/image";
const list_image_url = "/public/list";

export {
  api_all_music,
  api_music,
  api_collect_list,
  api_list,
  api_status,
  api_add,
  api_remove,
  music_file_url,
  music_image_url,
  list_image_url,
}