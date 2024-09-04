import { mount } from '@vue/test-utils';
import GameList from '@/views/HomeView.vue'
import { createPinia } from 'pinia';
import { router } from '@/router/';

describe('GameList.vue', () => {
  it('renders a list of games', async () => {
    const pinia = createPinia();
    const games = [
      {
        id: 1,
        name: 'Game 1',
        background_image: 'image1.jpg',
        released: '2024-01-01',
        rating: 4.5,
      },
      {
        id: 2,
        name: 'Game 2',
        background_image: 'image2.jpg',
        released: '2024-02-01',
        rating: 4.0,
      },
    ];

    const wrapper = mount(GameList, {
      props: {
        games,
      },
      global: {
        plugins: [router, pinia],
      },
    });

    // Check if the list of games is rendered correctly
    expect(wrapper.text()).toContain('Game 1');
    expect(wrapper.text()).toContain('Game 2');
  });
});
