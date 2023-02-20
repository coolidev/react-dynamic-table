import { IComparisonType } from "../utils/types";

const fakeData: IComparisonType = {
  tableStructure : {
    group: [
      {
        info: null,
        name: "Parameters",
        items: [
          {
            name: "Altitude (km)",
            key: "key11",
            rowBreakdownOptions: ["option1"]
          },
          {
            name: "Inclination (deg)",
            key: "key12",
            rowBreakdownOptions: ["option1","option2"]
          }
        ]
      },
      {
        info: null,
        name: "Performance",
        items: [
          {
            name: "RF Coverage (%)",
            key: "key21",
            rowBreakdownOptions: ["option2"]
          },
          {
            name: "Mean Number of RF Contacts Per Orbit",
            key: "key22",
            rowBreakdownOptions: []
          },
          {
            name: "Mean RF Contact Duration (seconds)",
            key: "key23",
            rowBreakdownOptions: ["option1"]
          },
          {
            name: "Average Gap (minutes)",
            key: "key24",
            rowBreakdownOptions: ["option1","option2"]
          },
          {
            name: "Max RF Coverage Gap (minutes)",
            key: "key25",
            rowBreakdownOptions: ["option2"]
          },
          {
            name: "Mean Response Time (seconds)",
            key: "key26",
            rowBreakdownOptions: []
          },
          {
            name: "Effective Comms Time (%)",
            key: "key27",
            rowBreakdownOptions: ["option1"]
          },
          {
            name: "Data Rate (kbps)",
            key: "key28",
            rowBreakdownOptions: ["option1","option2"]
          },
          {
            name: "Throughput (Gb/day)",
            key: "key29",
            rowBreakdownOptions: ["option2"]
          },
        ]
      },
      {
        info: null,
        name: "User Burden: Antenna Options",
        items: [
          {
            name: "User EIRP (dBW)",
            key: "key31",
            rowBreakdownOptions: ["option1"]
          },
          {
            name: "Parabolic Antenna Diameter (m)",
            key: "key32",
            rowBreakdownOptions: []
          },
          {
            name: "Parabolic Antenna Mass (kg)",
            key: "key33",
            rowBreakdownOptions: ["option1","option2"]
          },
          {
            name: "Electronically Steerable Antenna Size (m2)",
            key: "key34",
            rowBreakdownOptions: ["option2"]
          },
          {
            name: "Helical Antenna Height (m)",
            key: "key35",
            rowBreakdownOptions: []
          },
          {
            name: "Patch Antenna Size (m2)",
            key: "key36",
            rowBreakdownOptions: ["option1"]
          },
          {
            name: "Dipole Antenna Size (m)",
            key: "key37",
            rowBreakdownOptions: ["option1","option2"]
          },
        ]
      },
      {
        info: null,
        name: "Nav and Tracking",
        items: [
          {
            name: "Tracking Accuracy (m)",
            key: "key41",
            rowBreakdownOptions: ["option2"]
          },
          {
            name: "GNSS Availability",
            key: "key42",
            rowBreakdownOptions: []
          }
        ]
      }
    ],
    rowBreakdownOptions: [
      {
        key: "option1",
        name: "Option 1",
        action: `(rowKey) => {
          alert(rowKey);
        }`
      },
      {
        key: "option2",
        name: "Option 2",
        action: `(rowKey) => {
          alert(rowKey);
        }`
      }
    ]
  },
  columnData: [
    {
      name: "Project 1",
      key: "project1",
      data: [
        {
          key: "key11",
          value: "7"
        },
        {
          key: "key12",
          value: "6"
        },
        {
          key: "key21",
          value: "54"
        },
        {
          key: "key22",
          value: "23"
        },
        {
          key: "key23",
          value: "37"
        },
        {
          key: "key24",
          value: "25"
        },
        {
          key: "key25",
          value: "54"
        },
        {
          key: "key26",
          value: "17"
        },
        {
          key: "key27",
          value: "51"
        },
        {
          key: "key28",
          value: "57"
        },
        {
          key: "key29",
          value: "62"
        },
        {
          key: "key31",
          value: "82"
        },
        {
          key: "key32",
          value: "256"
        },
        {
          key: "key33",
          value: "113"
        },
        {
          key: "key34",
          value: "14"
        },
        {
          key: "key35",
          value: "27"
        },
        {
          key: "key36",
          value: "235"
        },
        {
          key: "key37",
          value: "174"
        },
        {
          key: "key41",
          value: "41"
        },
        {
          key: "key42",
          value: "20"
        }
      ]
    },
    {
      name: "Project 2",
      key: "project2",
      data: [
        {
          key: "key11",
          value: "82"
        },
        {
          key: "key12",
          value: "286"
        },
        {
          key: "key21",
          value: "6"
        },
        {
          key: "key22",
          value: "210"
        },
        {
          key: "key23",
          value: "166"
        },
        {
          key: "key24",
          value: "117"
        },
        {
          key: "key25",
          value: "174"
        },
        {
          key: "key26",
          value: "124"
        },
        {
          key: "key27",
          value: "48"
        },
        {
          key: "key28",
          value: "275"
        },
        {
          key: "key29",
          value: "139"
        },
        {
          key: "key31",
          value: "223"
        },
        {
          key: "key32",
          value: "80"
        },
        {
          key: "key33",
          value: "83"
        },
        {
          key: "key34",
          value: "30"
        },
        {
          key: "key35",
          value: "253"
        },
        {
          key: "key36",
          value: "21"
        },
        {
          key: "key37",
          value: "278"
        },
        {
          key: "key41",
          value: "161"
        },
        {
          key: "key42",
          value: "201"
        }
      ]
    },
    {
      name: "Project 3",
      key: "project3",
      data: [
        {
          key: "key11",
          value: "235"
        },
        {
          key: "key12",
          value: "241"
        },
        {
          key: "key21",
          value: "214"
        },
        {
          key: "key22",
          value: "200"
        },
        {
          key: "key23",
          value: "279"
        },
        {
          key: "key24",
          value: "282"
        },
        {
          key: "key25",
          value: "109"
        },
        {
          key: "key26",
          value: "56"
        },
        {
          key: "key27",
          value: "252"
        },
        {
          key: "key28",
          value: "107"
        },
        {
          key: "key29",
          value: "66"
        },
        {
          key: "key31",
          value: "133"
        },
        {
          key: "key32",
          value: "256"
        },
        {
          key: "key33",
          value: "229"
        },
        {
          key: "key34",
          value: "254"
        },
        {
          key: "key35",
          value: "74"
        },
        {
          key: "key36",
          value: "54"
        },
        {
          key: "key37",
          value: "219"
        },
        {
          key: "key41",
          value: "174"
        },
        {
          key: "key42",
          value: "44"
        }
      ]
    },
    {
      name: "Project 4",
      key: "project4",
      data: [
        {
          key: "key11",
          value: "87"
        },
        {
          key: "key12",
          value: "193"
        },
        {
          key: "key21",
          value: "189"
        },
        {
          key: "key22",
          value: "26"
        },
        {
          key: "key23",
          value: "41"
        },
        {
          key: "key24",
          value: "13"
        },
        {
          key: "key25",
          value: "245"
        },
        {
          key: "key26",
          value: "33"
        },
        {
          key: "key27",
          value: "97"
        },
        {
          key: "key28",
          value: "110"
        },
        {
          key: "key29",
          value: "176"
        },
        {
          key: "key31",
          value: "256"
        },
        {
          key: "key32",
          value: "133"
        },
        {
          key: "key33",
          value: "100"
        },
        {
          key: "key34",
          value: "212"
        },
        {
          key: "key35",
          value: "121"
        },
        {
          key: "key36",
          value: "135"
        },
        {
          key: "key37",
          value: "9"
        },
        {
          key: "key41",
          value: "232"
        },
        {
          key: "key42",
          value: "269"
        }
      ]
    },
    {
      name: "Project 5",
      key: "project5",
      data: [
        {
          key: "key11",
          value: "125"
        },
        {
          key: "key12",
          value: "212"
        },
        {
          key: "key21",
          value: "163"
        },
        {
          key: "key22",
          value: "209"
        },
        {
          key: "key23",
          value: "55"
        },
        {
          key: "key24",
          value: "198"
        },
        {
          key: "key25",
          value: "144"
        },
        {
          key: "key26",
          value: "217"
        },
        {
          key: "key27",
          value: "44"
        },
        {
          key: "key28",
          value: "101"
        },
        {
          key: "key29",
          value: "135"
        },
        {
          key: "key31",
          value: "68"
        },
        {
          key: "key32",
          value: "13"
        },
        {
          key: "key33",
          value: "123"
        },
        {
          key: "key34",
          value: "259"
        },
        {
          key: "key35",
          value: "97"
        },
        {
          key: "key36",
          value: "242"
        },
        {
          key: "key37",
          value: "215"
        },
        {
          key: "key41",
          value: "180"
        },
        {
          key: "key42",
          value: "85"
        }
      ]
    },
    {
      name: "Project 6",
      key: "project6",
      data: [
        {
          key: "key11",
          value: "247"
        },
        {
          key: "key12",
          value: "25"
        },
        {
          key: "key21",
          value: "54"
        },
        {
          key: "key22",
          value: "221"
        },
        {
          key: "key23",
          value: "68"
        },
        {
          key: "key24",
          value: "166"
        },
        {
          key: "key25",
          value: "12"
        },
        {
          key: "key26",
          value: "184"
        },
        {
          key: "key27",
          value: "289"
        },
        {
          key: "key28",
          value: "265"
        },
        {
          key: "key29",
          value: "123"
        },
        {
          key: "key31",
          value: "176"
        },
        {
          key: "key32",
          value: "13"
        },
        {
          key: "key33",
          value: "27"
        },
        {
          key: "key34",
          value: "214"
        },
        {
          key: "key35",
          value: "125"
        },
        {
          key: "key36",
          value: "33"
        },
        {
          key: "key37",
          value: "157"
        },
        {
          key: "key41",
          value: "216"
        },
        {
          key: "key42",
          value: "147"
        }
      ]
    },
    {
      name: "Project 7",
      key: "project7",
      data: [
        {
          key: "key11",
          value: "177"
        },
        {
          key: "key12",
          value: "8"
        },
        {
          key: "key21",
          value: "41"
        },
        {
          key: "key22",
          value: "132"
        },
        {
          key: "key23",
          value: "248"
        },
        {
          key: "key24",
          value: "20"
        },
        {
          key: "key25",
          value: "134"
        },
        {
          key: "key26",
          value: "87"
        },
        {
          key: "key27",
          value: "277"
        },
        {
          key: "key28",
          value: "212"
        },
        {
          key: "key29",
          value: "134"
        },
        {
          key: "key31",
          value: "284"
        },
        {
          key: "key32",
          value: "32"
        },
        {
          key: "key33",
          value: "26"
        },
        {
          key: "key34",
          value: "98"
        },
        {
          key: "key35",
          value: "177"
        },
        {
          key: "key36",
          value: "40"
        },
        {
          key: "key37",
          value: "66"
        },
        {
          key: "key41",
          value: "195"
        },
        {
          key: "key42",
          value: "274"
        }
      ]
    }
  ],
  columnSequence: ["project2", "project4", "project3"]
}

export default fakeData;
