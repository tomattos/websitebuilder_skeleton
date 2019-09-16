enum Tag {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p
}

export interface TextConfig {
  innerHtml: string;
  tag: Tag;
  styles: {
    textAlignment: 'left' | 'right' | 'center',
    fontWeight: 'normal' | 'bold',
    fontStyle: 'normal' | 'italic'
  };
}
