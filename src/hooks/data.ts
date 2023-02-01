const fakeData = {
  tableStructure : {
    group: [
      {
        info: null,
        name: "Group 1",
        items: [
          {name: "Item 1", key: "key1"},
          {name: "Item 2", key: "key2"},
        ]
      },
      {
        info: null,
        name: "Group 2",
        items: [
          {name: "Item 3", key: "key3"},
          {name: "Item 4", key: "key4"},
        ]
      }
    ]
  },
  columnData: [
    {
      name: "Column 1",
      key: "column1",
      data: [
        {
          key: "key1",
          value: "value1"
        },
        {
          key: "key2",
          value: "value2"
        },
        {
          key: "key3",
          value: "value3"
        },
        {
          key: "key4",
          value: "value4"
        }
      ]
    },
    {
      name: "Column 2",
      key: "column2",
      data: [
      ]
    }
  ]
}

export default fakeData;
