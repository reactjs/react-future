// Usage of VerticalList and VerticalListItem examples

class Newsfeed {
  render() {
    return (
      <VerticalList width={100}>
        {this.props.stories.map(story => <NewsStory story={story} />)}
      </VerticalList>
    );
  }
}

class NewsStory {
  render() {
    // Variable height list item (A list can also act as an item)
    return (
      <VerticalList>
        <Header>{this.props.story.title}</Header>
        <Content>{this.props.story.content}</Content>
      <VerticalList>
    );
  }
}

class Header {
  render() {
    return (
      // Small constant height item
      <VerticalListItem height={100}>
        {this.props.children}
      </VerticalListItem>
    );
  }
}

class Content {
  render() {
    // Slightly larger constant height item
    return (
      <VerticalListItem height={200}>
        {this.props.children}
      </VerticalListItem>
    );
  }
}
