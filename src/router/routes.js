export default [
  {
    path: '/',
    name: 'Main',
    redirect: '/editor',
    children: [
      { path: '/editor', name: 'Editor', meta: { title: '编辑器' } },
      { path: '/processLibrary', name: 'ProcessLibrary', meta: { title: '流程库' } },
    ],
  },
];
