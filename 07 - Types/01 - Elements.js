// This is using a made up type definition language. So far, this is not a
// complete type definition. It's a placeholder for describing terminology.

type ReactNode = ReactElement | ReactFragment | ReactText;

type ReactElement = ReactCompositeElement | ReactNativeElement;

type ReactNativeElement = {
  type: string,
  props: {
    children: ReactNodeList
  },
  key: string | boolean | number | null,
  ref: string | null
};

type ReactCompositeElement<TProps> = {
  type : ReactClass<TProps> | ReactModule<TProps>,
  props : TProps,
  key: string | boolean | number | null,
  ref: string | null
};

type ReactFragment = Array<ReactNode | ReactFragment | ReactEmpty>;

type ReactNodeList = ReactNode | ReactEmpty;

type ReactText = string | number;

type ReactEmpty = null | undefined | boolean;
