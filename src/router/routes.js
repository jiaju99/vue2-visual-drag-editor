export default [
  {
    path: '/',
    name: 'Main',
    redirect: '/editor',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '/editor',
        name: 'Editor',
        meta: { title: '编辑器' },
        component: () => import('@/views/Editor'),
      },
      {
        path: '/processLibrary',
        name: 'ProcessLibrary',
        meta: { title: '流程库' },
        component: () => import('@/views/ProcessLibrary'),
      },
    ],
  },
];
