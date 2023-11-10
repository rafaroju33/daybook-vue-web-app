import HomeView from "@/views/HomeView.vue";
import { shallowMount } from "@vue/test-utils";

describe("Test HomeView component", () => {
  test("Should match Snapshot", () => {
    const wrapper = shallowMount(HomeView);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("By clicking on a button should re-direct to no-entry", () => {
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = shallowMount(HomeView, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });
    wrapper.find("button").trigger("click");
    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" });
  });
});
