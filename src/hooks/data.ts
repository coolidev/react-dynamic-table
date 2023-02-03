const fakeData = {
  tableStructure : {
    group: [
      {
        info: null,
        name: "Group 1",
        items: [
          {
            name: "Item 1",
            key: "key1",
            rowBreakdownOptions: ['option1']
          },
          {
            name: "Item 2",
            key: "key2",
            rowBreakdownOptions: ['option2']
          },
        ]
      },
      {
        info: null,
        name: "Group 2",
        items: [
          {
            name: "Item 3",
            key: "key3",
            rowBreakdownOptions: ['option1', 'option2']
          },
          {
            name: "Item 4",
            key: "key4"
          },
        ]
      }
    ],
    rowBreakdownOptions: [
      {
        key: "option1",
        name: "Option 1",
        action: (rowKey: string) => {
          console.log("Option 1", rowKey);
        }
      },
      {
        key: "option2",
        name: "Option 2",
        action: (rowKey: string) => {
          console.log("Option 2", rowKey);
        }
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
    },
    {
      name: "Column 3",
      key: "column3",
      data: [
      ]
    }
  ],
  columnSequence: ["column3", "column1"]
}

export default fakeData;
