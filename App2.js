import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  List,
  Title,
  withTheme,
  Portal,
  Modal,
  Button,
  TextInput,
  Appbar,
  DefaultTheme,
  DarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

class App extends Component {
  constructor(props) {
    super(props);
    const dark = false;

    this.state = {
      modalIsVisible: false,
      // toDos: [],
      toDos: new Array(10).fill('').map(() =>
        Math.random()
          .toString(36)
          .substring(2, 15)
          .toUpperCase(),
      ),
      currentTodo: -1,
      text: '',
      theme: this._getTheme(dark),
      dark,
    };
  }

  _getTheme = (dark = false) => ({
    ...(dark ? DarkTheme : DefaultTheme),
    colors: {
      ...(dark ? DarkTheme.colors : DefaultTheme.colors),
      primary: '#00a1e0',
      accent: 'yellow',
    },
    mode: 'adaptive',
    dark,
  });

  _changeDark = () => {
    const { dark } = this.state;
    const theme = this._getTheme(!dark);
    this.setState({ theme, dark: !dark }, () =>
      StatusBar.setBackgroundColor(!dark ? '#272727' : theme.colors.primary),
    );
  };

  _hideModal = () => {
    this.setState({ modalIsVisible: false });
  };

  _onChangeText = text => {
    this.setState({ text });
  };

  _handleAdd = () => {
    this.setState({
      modalIsVisible: true,
    });
  };

  _onEdit = selectedToDo => () => {
    this.setState(({ toDos }) => ({
      currentTodo: selectedToDo,
      modalIsVisible: true,
      text: toDos[selectedToDo],
    }));
  };

  _onDelete = selectedToDo => () => {
    this.setState(({ toDos }) => ({ toDos: toDos.filter((_, i) => selectedToDo !== i) }));
  };

  _onSaveToDo = () => {
    this.setState(({ toDos, text, currentTodo }) =>
      text === ''
        ? null
        : {
            toDos:
              currentTodo === -1
                ? [...toDos, text]
                : toDos.map((toDo, i) => (i === currentTodo ? text : toDo)),
            text: '',
            modalIsVisible: false,
            currentTodo: -1,
          },
    );
  };

  render() {
    const { modalIsVisible, toDos, text, currentTodo, theme } = this.state;
    const additionalStyle = { backgroundColor: theme.colors.background };
    const modalTitle = currentTodo === -1 ? 'New TODO' : 'Edit TODO';

    return (
      <PaperProvider theme={theme}>
        <StatusBar backgroundColor={theme.colors.primary} />

        <Appbar.Header>
          <Appbar.Content title="TODO App" />
          <Appbar.Action icon="plus" onPress={this._handleAdd} />
          <Appbar.Action icon="brightness-6" onPress={this._changeDark} />
        </Appbar.Header>

        <SafeAreaView style={[styles.body, additionalStyle]}>
          <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
            <List.Section>
              <List.Subheader>My TODO's</List.Subheader>
              {toDos.map((toDo, i) => (
                <List.Item
                  key={i}
                  right={props => (
                    <>
                      <TouchableOpacity onPress={this._onEdit(i)}>
                        <List.Icon {...props} icon="pencil" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this._onDelete(i)}>
                        <List.Icon {...props} icon="trash-can" />
                      </TouchableOpacity>
                    </>
                  )}
                  title={toDo}
                  description={`Item #${i}`}
                />
              ))}
            </List.Section>
          </ScrollView>
        </SafeAreaView>

        <Portal>
          <Modal
            backdropColor="transparent"
            transparent={false}
            visible={modalIsVisible}
            onDismiss={this._hideModal}
            contentContainerStyle={[styles.modal, additionalStyle]}
            dismissable>
            <View>
              <Title style={styles.modalTitle}>{modalTitle}</Title>
              <TextInput
                label="Description"
                value={text}
                editable
                mode="outlined"
                onChangeText={this._onChangeText}
              />
              <Button
                style={styles.modalButton}
                icon="content-save"
                mode="contained"
                onPress={this._onSaveToDo}>
                Save
              </Button>
            </View>
          </Modal>
        </Portal>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {},
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    flex: 1,
  },
  modal: {
    marginHorizontal: 20,
    padding: 20,
  },
  modalTitle: {
    paddingBottom: 10,
  },
  modalButton: {
    marginTop: 20,
  },
});

export default withTheme(App);
