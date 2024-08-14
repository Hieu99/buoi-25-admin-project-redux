import axiosRequester from "../http/instance";

class UserRequester {
  static async signup(payload) {
    return await axiosRequester({
      url: "/user",
      method: "POST",
      data: payload,
    });
  }

  static async listUser(signal) {
    return await axiosRequester({
      url: "/user",
      method: "GET",
      signal,
    });
  }

  static async deleteUser(id) {
    return await axiosRequester({
      url: "/user/" + id,
      method: "DELETE",
    });
  }

  static async userDetail(id, signal) {
    return await axiosRequester({
      url: `/user/${id}`,
      method: "GET",
      signal,
    });
  }

  static async updateUser(id, payload) {
    return await axiosRequester({
      url: `/user/${id}`,
      method: "PUT",
      data: payload,
    });
  }
}

export default UserRequester;
