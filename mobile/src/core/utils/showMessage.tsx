import { Alert, Button } from 'react-native';

interface ShowMessageProps {
  title: string;
  message: string;
  onCancelPress?: () => void;
  onButtonPress?: () => void;
}

export const showMessage = (props: ShowMessageProps) => {
    const { title, message, onButtonPress, onCancelPress } = props;
    Alert.alert(
        title,
        message,
        [
        {
            text: 'Cancel',
            onPress: onCancelPress || undefined,
            style: 'cancel', // iOS only
        },
        { text: 'OK', onPress: onButtonPress || undefined },
        ],
    );
};