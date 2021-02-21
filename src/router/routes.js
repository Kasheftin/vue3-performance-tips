import Home from '@/views/Home.vue'
import Examples from '@/views/Examples.vue'
import Example1 from '@/views/Example1.vue'
import Example2 from '@/views/Example2.vue'
import Example3 from '@/views/Example3.vue'
import Example4p1 from '@/views/Example4p1.vue'
import Example4p2 from '@/views/Example4p2.vue'
import Example4p3 from '@/views/Example4p3.vue'
import Example4p4 from '@/views/Example4p4.vue'
import Example5 from '@/views/Example5.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/examples',
    name: 'examples',
    component: Examples,
    children: [
      {
        path: '/example1',
        name: 'example1',
        component: Example1,
        meta: {
          title: 'Example 1. Object Watcher',
          description: `
Item watcher over object-like variable can produce redundant runs.
Creating the separate primitive-type computed especially for the watcher solves the issue.
          `,
          instructions: `
Drag & drop items.
There're 2 watchers: the first one over an itemIds object, the second one - over itemIdsTrigger string.
Notice that both watchers run after drag & drop (console.log).
Check any item.
Notice that itemIds object watcher mistakenly detects the change during item check/uncheck while itemIdsTrigger string watcher runs only when it should.
          `
        }
      },
      {
        path: '/example2',
        name: 'example2',
        component: Example2,
        meta: {
          title: 'Example 2. Vuex + Object.freeze',
          description: `
Vuex makes each object property observable (recursively) by default.
In some cases that is not needed, and it leads to high memory usage.
One solution could be using Object.freeze before storing objects in vuex.
The effect seems to be negligible in vue3.
          `,
          instructions: `
Use chrome devtools memory tab. Add 100 items in a regular way. Take heap snapshot.
Clear regular items, add 100 items using Object.freeze. Take another heap snapshot.
Notice the difference.
          `
        }
      },
      {
        path: '/example3',
        name: 'example3',
        component: Example3,
        meta: {
          title: 'Example 3. Functional vs Map Getter',
          description: `
Functional getters are not cached. They are just plain functions and revaluated every time they are called.
          `,
          instructions: `
There's console.time invoked for itemById and itemByIds getters.
Notice the first getter was called 10 times, the second one was called only once.
          `
        }
      },
      {
        path: '/example4p1',
        name: 'example4p1',
        component: Example4p1,
        meta: {
          title: 'Example 4.1. Incorrect Component Code Splitting',
          description: `
Incorrect component-code splitting causes every <Item> component rerendering when only one item changes.
          `,
          instructions: `
Add some items. Check an item, rename it or move.
Notice that alongside with the target all the rest <Item> components trigger rerendering as well (use vue devtools performance component render tab).
          `
        }
      },
      {
        path: '/example4p2',
        name: 'example4p2',
        component: Example4p2,
        meta: {
          title: 'Example 4.2. Fixing Item Rename (reordering works in vue2 and is broken in vue3)',
          description: `
Renaming can be fixed by referring to the original itemsByIds instead of the getter.
But it does not solve rerendering that happens after checking an item.
Item reordering is also broken - and this behavior differs from vue2 (In vue2 it works correctly).
          `,
          instructions: `
Try to rename an item. It works correctly.
Try to check an item. All the <Item> components mistakenly rerendered.
Try to reorder items: All the <Item> components mistakenly rerendered.
This differs from the vue2 behavior (there reordering does not affect on <Item> render).
Check the next example for the explanation.
          `,
          explanation: `
Renaming works correctly because here we refer to the original itemsByIds object.
Renaming mutation does not update the entire object - it updates only particular item inside.
From the other side, isChecked computed refers to the entire checkedIds array while trying to find if the item is checked.
          `
        }
      },
      {
        path: '/example4p3',
        name: 'example4p3',
        component: Example4p3,
        meta: {
          title: 'Example 4.3 Fixing Item Reordering (for vue3)',
          description: `
The reason of broken reordering is that vue3 can not cache an event handler if it refers to a scope variable.
Every reorder creates a new event function that causes the <Item> component to update.
Luckly it's easy to fix. In this example we initialize event arguments inside <Item> component, that's why items reordering works correctly.
          `,
          instructions: `
Try to reorder items. Notice <Item> components are not updated.
          `
        }
      },
      {
        path: '/example4p4',
        name: 'example4p4',
        component: Example4p4,
        meta: {
          title: 'Example 4.4. Fixing Item Checking (final working solution)',
          description: `
Rerendering during item check/uncheck can be fixed by providing exact boolean prop to the <Item> component instead of searching for that value from inside each <Item> component.
          `,
          instructions: `
Try to rename, check or resort items. It works correctly - only the target item gets updated.
          `,
          explanation: `
Here we provide the original item object and boolean isChecked prop by the parent list component.
That granularity gives vue the possibility to detect if the <Item> has to be updated.
          `
        }
      },
      {
        path: '/example5',
        name: 'example5',
        component: Example5,
        meta: {
          title: 'Example 5. Intersection Observer',
          description: `
Sometimes the DOM is heavy by itself.
This trick shows how IntersectionObserver can be used to skip DOM updates for the nodes outside of the viewport.
          `,
          instructions: `
Add some items. Each item toggles a heavy svg to blink every 500ms. Notice how lattency grows.
Enable IntersectionObserver. It will hide svg-s outside of the viewport by using css display none.
That helps performance a lot.
          `
        }
      }
    ]
  }
]
