const theme = {
  button: {
    valid: {
      colors: [],
    },
    styles: {
      base: {
        initial: {
          fontFamily: "font-inter",
          textTransform: "none",
        },
      },
      variants: {
        filled: {},
      },
    },
  },
  input: {
    styles: {
      base: {
        container: {
          minWidth: "",
        },
        input: {
          fontFamily: "font-inter",
        },
      },
      variants: {
        outlined: {
          sizes: {
            md: {
              container: {
                height: "h-8",
              },
              input: {
                py: "py-2",
              },
            },
          },
        },
      },
    },
  },
  chip: {
    styles: {
      base: {
        chip: {
          fontFamily: "font-inter",
          fontWeight: " font-normal",
          textTransform: "none",
        },
        action: {
          rounded: "rounded-full"
        },
      },
      sizes: {
        sm: {
          action: {
            width: "w-4",
            height: "h-4",
          },
        },
      },
    },
  },
  menu: {
    styles: {
      base: {
        menu: {
          minWidth: "",
          fontFamily: "font-inter",
          fontSize: "text-xs",
          borderRadius: "rounded-md",
        },
        item: {
          initial: {
            borderRadius: "rounded-md",
            bg: "hover:bg-hover",
            color: "hover:text-primary-text",
          }
        }
      }
    }
  },
};

export default theme;
