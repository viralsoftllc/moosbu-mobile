import {View, TouchableOpacity, Text} from 'react-native';
import React, {useState} from 'react';

import {FONTS, COLORS} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';

const Accordion = ({title, children, complete}) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(prev => !prev);

  return (
    <View style={{marginBottom: 20}}>
      <TouchableOpacity
        onPress={toggleExpanded}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          {complete && (
            <UseIcon
              type="MaterialIcons"
              name="check-circle"
              color={COLORS.credit}
            />
          )}
          <Text style={{...FONTS.h5}}>{title}</Text>
        </View>
        <UseIcon
          type="Entypo"
          name={expanded ? 'chevron-down' : 'chevron-right'}
        />
      </TouchableOpacity>
      {expanded && children}
    </View>
  );
};

export default Accordion;
