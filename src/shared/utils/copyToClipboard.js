import Clipboard from '@react-native-community/clipboard';
import notifyMessage from '../hooks/notifyMessage';

export default function copyToClipboard(content, message) {
  Clipboard.setString(content);
  notifyMessage(message || 'Copied');
}
