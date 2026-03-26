import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TodoItemComponent from '../TodoItemComponent.vue'

describe('TodoItemComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(TodoItemComponent, { props: { 
        todo: {
            id: "5",
            text: "Tache 1",
            completed: false,
        }
    }});

    const span = wrapper.find("span")

    expect(span.text()).toContain('Tache 1')
  }),

  it('test the delete click', async () => {
    const wrapper = mount(TodoItemComponent, { props: { 
        todo: {
            id: "5",
            text: "Tache 1",
            completed: false,
        }
    }});

    const buttons = wrapper.findAll("button");
    const buttonDelete = buttons[1];

    await buttonDelete?.trigger('click'); //Trigger renvoie une promesse donc utilise async / await

    expect(wrapper.emitted()).toHaveProperty('delete');
  })
})
