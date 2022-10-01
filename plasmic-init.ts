/** @format */

import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

import {
  TabButton,
  TabContent,
  TabsContainer,
  TabUnderline,
} from "./components/Tabs";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "nNXuxHPaPpBpFu6TFAsYVr",
      token:
        "hcPtgGkYVzKk5HgzipiU0IGaylqzzR9vTIVvjbSflRkXy6SVEHs2Hqwd2jA3ugo8axGA5385JCgUT65y96Q",
    },
  ],

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
  preview: false,
});

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

function defaultButtonChildren(label: string) {
  return {
    type: "default-component",
    kind: "button",
    props: {
      children: {
        type: "text",
        value: label,
      },
    },
  } as const;
}

PLASMIC.registerComponent(TabsContainer, {
  name: "TabsContainer",
  displayName: "Tabs Container",
  providesData: true,
  props: {
    initialKey: {
      type: "string",
      description: "Key of the initially selected tab",
      defaultValue: "tab1",
    },
    previewKey: {
      type: "string",
      description: "Show this key while editing in Plasmic Studio",
    },
    previewAll: {
      type: "boolean",
      description: "Reveal all tab contents while editing in Plasmic Studio",
    },
    children: {
      type: "slot",
      defaultValue: {
        type: "vbox",
        children: [
          {
            type: "hbox",
            children: [
              {
                type: "component",
                name: "TabButton",
                props: {
                  tabKey: "tab1",
                  children: defaultButtonChildren("Tab 1"),
                },
              },
              {
                type: "component",
                name: "TabButton",
                props: {
                  tabKey: "tab2",
                  children: defaultButtonChildren("Tab 2"),
                },
              },
              {
                type: "component",
                name: "TabUnderline",
              },
            ],
          },
          {
            type: "vbox",
            children: [
              {
                type: "component",
                name: "TabContent",
                props: {
                  tabKey: "tab1",
                  children: [
                    {
                      type: "vbox",
                      children: ["Some content for tab 1"],
                    },
                  ],
                },
              },
              {
                type: "component",
                name: "TabContent",
                props: {
                  tabKey: "tab2",
                  children: [
                    {
                      type: "vbox",
                      children: ["Some content for tab 2"],
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  },
  defaultStyles: {
    width: "stretch",
    padding: "8px",
  },
});

PLASMIC.registerComponent(TabUnderline, {
  name: "TabUnderline",
  displayName: "Tab Underline",
  props: {
    children: {
      type: "slot",
    },
  },
  defaultStyles: {
    background: "#7777ff",
    height: "2px",
  },
});

PLASMIC.registerComponent(TabButton, {
  name: "TabButton",
  displayName: "Tab Button",
  isAttachment: true,
  props: {
    tabKey: {
      type: "string",
      description: "The answer value selecting this choice sets",
    },
    children: {
      type: "slot",
      defaultValue: defaultButtonChildren("Some tab"),
    },
  },
  defaultStyles: {
    width: "hug",
  },
});

PLASMIC.registerComponent(TabContent, {
  name: "TabContent",
  displayName: "Tab Content",
  isAttachment: true,
  props: {
    tabKey: {
      type: "string",
      description: "The answer value selecting this choice sets",
    },
    children: {
      type: "slot",
      defaultValue: {
        type: "vbox",
        children: {
          type: "text",
          value: "This is some tab content",
        },
      },
    },
  },
});
