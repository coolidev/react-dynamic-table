import { IComparisonType } from "../utils/types";

const fakeData: IComparisonType = {
  tableStructure : {
    group: [
      {
        info: null,
        name: "Mission",
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
          },
          {
            name: "Eccentricity",
            key: "key13",
            rowBreakdownOptions: ["option1","option2"]
          },
          {
            name: "Frequency Band",
            key: "key14",
            rowBreakdownOptions: ["option1","option2"]
          },
          {
            name: "Modulation",
            key: "key15",
            rowBreakdownOptions: ["option1","option2"]
          },
          {
            name: "Coding",
            key: "key16",
            rowBreakdownOptions: ["option1","option2"]
          },
          {
            name: "Standards Compliance",
            key: "key17",
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
            key: "key20",
            rowBreakdownOptions: ["option2"]
          },
          {
            name: "Mean Number of RF Contacts Per Orbit",
            key: "key21",
            rowBreakdownOptions: []
          },
          {
            name: "Mean RF Contact Duration (min.)",
            key: "key22",
            rowBreakdownOptions: ["option1"]
          },
          {
            name: "Average Contact Duration (min.)",
            key: "key23",
            rowBreakdownOptions: ["option1"]
          },
          {
            name: "Average Gap (min.)",
            key: "key24",
            rowBreakdownOptions: ["option1","option2"]
          },
          {
            name: "Max RF Coverage Gap (min.)",
            key: "key25",
            rowBreakdownOptions: ["option2"]
          },
          {
            name: "Mean Response Time (min.)",
            key: "key26",
            rowBreakdownOptions: []
          },
          {
            name: "Effective Comms Time (%)",
            key: "key27",
            rowBreakdownOptions: ["option1"]
          },
          {
            name: "Data Rate (Mbps)",
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
      width: 150,
      data: [
        {
          key: "key11",
          input: "input 7",
          output: "output-7"
        },
        {
          key: "key12",
          input: "input-6",
          output: "output-6"
        },
        {
          key: "key13",
          input: "input-185",
          output: "output-102"
        },
        {
          key: "key14",
          input: "input-207",
          output: "output-36"
        },
        {
          key: "key15",
          input: "input-233",
          output: "output-121"
        },
        {
          key: "key16",
          input: "input-200",
          output: "output-32"
        },
        {
          key: "key17",
          input: "input-172",
          output: "output-233"
        },
        {
          key: "key20",
          input: "input-260",
          output: "output-180"
        },
        {
          key: "key21",
          input: "input-54",
          output: "output-54"
        },
        {
          key: "key22",
          input: "input-23",
          output: "output-23"
        },
        {
          key: "key23",
          input: "input-37",
          output: "output-37"
        },
        {
          key: "key24",
          input: "input-25",
          output: "output-25"
        },
        {
          key: "key25",
          input: "input-54",
          output: "output-54"
        },
        {
          key: "key26",
          input: "input-17",
          output: "output-17"
        },
        {
          key: "key27",
          input: "input-51",
          output: "output-51"
        },
        {
          key: "key28",
          input: "input-57",
          output: "output-57"
        },
        {
          key: "key29",
          input: "input-62",
          output: "output-62"
        },
        {
          key: "key31",
          input: "input-82",
          output: "output-82"
        },
        {
          key: "key32",
          input: "input-256",
          output: "output-256"
        },
        {
          key: "key33",
          input: "input-113",
          output: "output-113"
        },
        {
          key: "key34",
          input: "input-14",
          output: "output-14"
        },
        {
          key: "key35",
          input: "input-27",
          output: "output-27"
        },
        {
          key: "key36",
          input: "input-235",
          output: "output-235"
        },
        {
          key: "key37",
          input: "input-174",
          output: "output-174"
        },
        {
          key: "key41",
          input: "input-41",
          output: "output-41"
        },
        {
          key: "key42",
          input: "input-20",
          output: "output-20"
        }
      ]
    },
    {
      name: "Project 2",
      key: "project2",
      width: 150,
      data: [
        {
          key: "key11",
          input: "input 7",
          output: "output-82"
        },
        {
          key: "key12",
          input: "input-6",
          output: "output-286"
        },
        {
          key: "key13",
          input: "input-185",
          output: "output-102"
        },
        {
          key: "key14",
          input: "input-207",
          output: "output-36"
        },
        {
          key: "key15",
          input: "input-233",
          output: "output-121"
        },
        {
          key: "key16",
          input: "input-200",
          output: "output-32"
        },
        {
          key: "key17",
          input: "input-172",
          output: "output-233"
        },
        {
          key: "key20",
          input: "input-260",
          output: "output-180"
        },
        {
          key: "key21",
          input: "input-54",
          output: "output-6"
        },
        {
          key: "key22",
          input: "input-23",
          output: "output-210"
        },
        {
          key: "key23",
          input: "input-37",
          output: "output-166"
        },
        {
          key: "key24",
          input: "input-25",
          output: "output-117"
        },
        {
          key: "key25",
          input: "input-54",
          output: "output-174"
        },
        {
          key: "key26",
          input: "input-17",
          output: "output-124"
        },
        {
          key: "key27",
          input: "input-51",
          output: "output-48"
        },
        {
          key: "key28",
          input: "input-57",
          output: "output-275"
        },
        {
          key: "key29",
          input: "input-62",
          output: "output-139"
        },
        {
          key: "key31",
          input: "input-82",
          output: "output-223"
        },
        {
          key: "key32",
          input: "input-256",
          output: "output-80"
        },
        {
          key: "key33",
          input: "input-113",
          output: "output-83"
        },
        {
          key: "key34",
          input: "input-14",
          output: "output-30"
        },
        {
          key: "key35",
          input: "input-27",
          output: "output-253"
        },
        {
          key: "key36",
          input: "input-235",
          output: "output-21"
        },
        {
          key: "key37",
          input: "input-174",
          output: "output-278"
        },
        {
          key: "key41",
          input: "input-41",
          output: "output-161"
        },
        {
          key: "key42",
          input: "input-20",
          output: "output-201"
        }
      ]
    },
    {
      name: "Project 3",
      key: "project3",
      width: 150,
      data: [
        {
          key: "key11",
          input: "input-235",
          output: "output-235"
        },
        {
          key: "key12",
          input: "input-241",
          output: "output-241"
        },
        {
          key: "key13",
          input: "input-163",
          output: "output-187"
        },
        {
          key: "key14",
          input: "input-7",
          output: "output-251"
        },
        {
          key: "key15",
          input: "input-97",
          output: "output-190"
        },
        {
          key: "key16",
          input: "input-47",
          output: "output-211"
        },
        {
          key: "key17",
          input: "input-16",
          output: "output-253"
        },
        {
          key: "key20",
          input: "input-273",
          output: "output-164"
        },
        {
          key: "key21",
          input: "input-214",
          output: "output-214"
        },
        {
          key: "key22",
          input: "input-200",
          output: "output-200"
        },
        {
          key: "key23",
          input: "input-279",
          output: "output-279"
        },
        {
          key: "key24",
          input: "input-282",
          output: "output-282"
        },
        {
          key: "key25",
          input: "input-109",
          output: "output-109"
        },
        {
          key: "key26",
          input: "input-56",
          output: "output-56"
        },
        {
          key: "key27",
          input: "input-252",
          output: "output-252"
        },
        {
          key: "key28",
          input: "input-107",
          output: "output-107"
        },
        {
          key: "key29",
          input: "input-66",
          output: "output-66"
        },
        {
          key: "key31",
          input: "input-133",
          output: "output-133"
        },
        {
          key: "key32",
          input: "input-256",
          output: "output-256"
        },
        {
          key: "key33",
          input: "input-229",
          output: "output-229"
        },
        {
          key: "key34",
          input: "input-254",
          output: "output-254"
        },
        {
          key: "key35",
          input: "input-74",
          output: "output-74"
        },
        {
          key: "key36",
          input: "input-54",
          output: "output-54"
        },
        {
          key: "key37",
          input: "input-219",
          output: "output-219"
        },
        {
          key: "key41",
          input: "input-174",
          output: "output-174"
        },
        {
          key: "key42",
          input: "input-44",
          output: "output-44"
        }
      ]
    },
    {
      name: "Project 4",
      key: "project4",
      width: 150,
      data: [
        {
          key: "key11",
          input: "input-87",
          output: "output-87"
        },
        {
          key: "key12",
          input: "input-193",
          output: "output-193"
        },
        {
          key: "key13",
          input: "input-163",
          output: "output-187"
        },
        {
          key: "key14",
          input: "input-7",
          output: "output-251"
        },
        {
          key: "key15",
          input: "input-97",
          output: "output-190"
        },
        {
          key: "key16",
          input: "input-47",
          output: "output-211"
        },
        {
          key: "key17",
          input: "input-16",
          output: "output-253"
        },
        {
          key: "key20",
          input: "input-273",
          output: "output-164"
        },
        {
          key: "key21",
          input: "input-189",
          output: "output-189"
        },
        {
          key: "key22",
          input: "input-26",
          output: "output-26"
        },
        {
          key: "key23",
          input: "input-41",
          output: "output-41"
        },
        {
          key: "key24",
          input: "input-13",
          output: "output-13"
        },
        {
          key: "key25",
          input: "input-245",
          output: "output-245"
        },
        {
          key: "key26",
          input: "input-33",
          output: "output-33"
        },
        {
          key: "key27",
          input: "input-97",
          output: "output-97"
        },
        {
          key: "key28",
          input: "input-110",
          output: "output-110"
        },
        {
          key: "key29",
          input: "input-176",
          output: "output-176"
        },
        {
          key: "key31",
          input: "input-256",
          output: "output-256"
        },
        {
          key: "key32",
          input: "input-133",
          output: "output-133"
        },
        {
          key: "key33",
          input: "input-100",
          output: "output-100"
        },
        {
          key: "key34",
          input: "input-212",
          output: "output-212"
        },
        {
          key: "key35",
          input: "input-121",
          output: "output-121"
        },
        {
          key: "key36",
          input: "input-135",
          output: "output-135"
        },
        {
          key: "key37",
          input: "input-9",
          output: "output-9"
        },
        {
          key: "key41",
          input: "input-232",
          output: "output-232"
        },
        {
          key: "key42",
          input: "input-269",
          output: "output-269"
        }
      ]
    },
    {
      name: "Project 5",
      key: "project5",
      width: 150,
      data: [
        {
          key: "key11",
          input: "input-87",
          output: "output-125"
        },
        {
          key: "key12",
          input: "input-193",
          output: "output-212"
        },
        {
          key: "key13",
          input: "input-163",
          output: "output-187"
        },
        {
          key: "key14",
          input: "input-7",
          output: "output-251"
        },
        {
          key: "key15",
          input: "input-97",
          output: "output-190"
        },
        {
          key: "key16",
          input: "input-47",
          output: "output-211"
        },
        {
          key: "key17",
          input: "input-16",
          output: "output-253"
        },
        {
          key: "key20",
          input: "input-273",
          output: "output-164"
        },
        {
          key: "key21",
          input: "input-189",
          output: "output-163"
        },
        {
          key: "key22",
          input: "input-26",
          output: "output-209"
        },
        {
          key: "key23",
          input: "input-41",
          output: "output-55"
        },
        {
          key: "key24",
          input: "input-13",
          output: "output-198"
        },
        {
          key: "key25",
          input: "input-245",
          output: "output-144"
        },
        {
          key: "key26",
          input: "input-33",
          output: "output-217"
        },
        {
          key: "key27",
          input: "input-97",
          output: "output-44"
        },
        {
          key: "key28",
          input: "input-110",
          output: "output-101"
        },
        {
          key: "key29",
          input: "input-176",
          output: "output-135"
        },
        {
          key: "key31",
          input: "input-256",
          output: "output-68"
        },
        {
          key: "key32",
          input: "input-133",
          output: "output-13"
        },
        {
          key: "key33",
          input: "input-100",
          output: "output-123"
        },
        {
          key: "key34",
          input: "input-212",
          output: "output-259"
        },
        {
          key: "key35",
          input: "input-121",
          output: "output-97"
        },
        {
          key: "key36",
          input: "input-135",
          output: "output-242"
        },
        {
          key: "key37",
          input: "input-9",
          output: "output-215"
        },
        {
          key: "key41",
          input: "input-232",
          output: "output-180"
        },
        {
          key: "key42",
          input: "input-269",
          output: "output-85"
        }
      ]
    },
    {
      name: "Project 6",
      key: "project6",
      width: 150,
      data: [
        {
          key: "key11",
          input: "input-247",
          output: "output-247"
        },
        {
          key: "key12",
          input: "input-25",
          output: "output-25"
        },{
          key: "key13",
          input: "input-133",
          output: "output-168"
        },
        {
          key: "key14",
          input: "input-218",
          output: "output-100"
        },
        {
          key: "key15",
          input: "input-162",
          output: "output-206"
        },
        {
          key: "key16",
          input: "input-206",
          output: "output-83"
        },
        {
          key: "key17",
          input: "input-200",
          output: "output-142"
        },
        {
          key: "key20",
          input: "input-279",
          output: "output-240"
        },
        {
          key: "key21",
          input: "input-54",
          output: "output-54"
        },
        {
          key: "key22",
          input: "input-221",
          output: "output-221"
        },
        {
          key: "key23",
          input: "input-68",
          output: "output-68"
        },
        {
          key: "key24",
          input: "input-166",
          output: "output-166"
        },
        {
          key: "key25",
          input: "input-12",
          output: "output-12"
        },
        {
          key: "key26",
          input: "input-184",
          output: "output-184"
        },
        {
          key: "key27",
          input: "input-289",
          output: "output-289"
        },
        {
          key: "key28",
          input: "input-265",
          output: "output-265"
        },
        {
          key: "key29",
          input: "input-123",
          output: "output-123"
        },
        {
          key: "key31",
          input: "input-176",
          output: "output-176"
        },
        {
          key: "key32",
          input: "input-13",
          output: "output-13"
        },
        {
          key: "key33",
          input: "input-27",
          output: "output-27"
        },
        {
          key: "key34",
          input: "input-214",
          output: "output-214"
        },
        {
          key: "key35",
          input: "input-125",
          output: "output-125"
        },
        {
          key: "key36",
          input: "input-33",
          output: "output-33"
        },
        {
          key: "key37",
          input: "input-157",
          output: "output-157"
        },
        {
          key: "key41",
          input: "input-216",
          output: "output-216"
        },
        {
          key: "key42",
          input: "input-147",
          output: "output-147"
        }
      ]
    },
    {
      name: "Project 7",
      key: "project7",
      width: 150,
      data: [
        {
          key: "key11",
          input: "input-177",
          output: "output-177"
        },
        {
          key: "key12",
          input: "input-8",
          output: "output-8"
        },
        {
          key: "key13",
          input: "input-208",
          output: "output-223"
        },
        {
          key: "key14",
          input: "input-178",
          output: "output-243"
        },
        {
          key: "key15",
          input: "input-13",
          output: "output-122"
        },
        {
          key: "key16",
          input: "input-59",
          output: "output-178"
        },
        {
          key: "key17",
          input: "input-143",
          output: "output-218"
        },
        {
          key: "key20",
          input: "input-126",
          output: "output-131"
        },
        {
          key: "key21",
          input: "input-41",
          output: "output-41"
        },
        {
          key: "key22",
          input: "input-132",
          output: "output-132"
        },
        {
          key: "key23",
          input: "input-248",
          output: "output-248"
        },
        {
          key: "key24",
          input: "input-20",
          output: "output-20"
        },
        {
          key: "key25",
          input: "input-134",
          output: "output-134"
        },
        {
          key: "key26",
          input: "input-87",
          output: "output-87"
        },
        {
          key: "key27",
          input: "input-277",
          output: "output-277"
        },
        {
          key: "key28",
          input: "input-212",
          output: "output-212"
        },
        {
          key: "key29",
          input: "input-134",
          output: "output-134"
        },
        {
          key: "key31",
          input: "input-284",
          output: "output-284"
        },
        {
          key: "key32",
          input: "input-32",
          output: "output-32"
        },
        {
          key: "key33",
          input: "input-26",
          output: "output-26"
        },
        {
          key: "key34",
          input: "input-98",
          output: "output-98"
        },
        {
          key: "key35",
          input: "input-177",
          output: "output-177"
        },
        {
          key: "key36",
          input: "input-40",
          output: "output-40"
        },
        {
          key: "key37",
          input: "input-66",
          output: "output-66"
        },
        {
          key: "key41",
          input: "input-195",
          output: "output-195"
        },
        {
          key: "key42",
          input: "input-274",
          output: "output-274"
        }
      ]
    }
  ],
  columnSequence: ["project2", "project4", "project3"]
}

export default fakeData;
