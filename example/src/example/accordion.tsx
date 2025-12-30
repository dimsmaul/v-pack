import React from 'react';
import { Text, View } from 'react-native';
import tw from '../../../src/utils/tw';
import {
  VAccordion,
  VAccordionContent,
  VAccordionItem,
  VAccordionTrigger,
} from 'v-pack';

const ExampleAccordion: React.FC = () => {
  return (
    <View
      style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
    >
      <Text
        style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
      >
        Accordion
      </Text>
      <View style={tw`p-4`}>
        <VAccordion type="single">
          <VAccordionItem>
            <VAccordionTrigger>
              <Text style={tw`font-medium`}>What is React Native?</Text>
            </VAccordionTrigger>
            <VAccordionContent>
              <Text style={tw`text-gray-600`}>
                React Native is a framework for building mobile apps.
              </Text>
            </VAccordionContent>
          </VAccordionItem>

          <VAccordionItem>
            <VAccordionTrigger>
              <Text style={tw`font-medium`}>What is v-pack?</Text>
            </VAccordionTrigger>
            <VAccordionContent>
              <Text style={tw`text-gray-600`}>
                v-pack is a component library with twrnc.
              </Text>
            </VAccordionContent>
          </VAccordionItem>
          <VAccordionItem>
            <VAccordionTrigger>
              <Text style={tw`font-medium`}>What is v-pack?</Text>
            </VAccordionTrigger>
            <VAccordionContent>
              <Text style={tw`text-gray-600`}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
                aspernatur alias deleniti necessitatibus non dolorum iure
                explicabo nemo, numquam autem eveniet impedit quasi tempore
                debitis ipsam natus, corrupti suscipit. Aperiam minima voluptas
                quod cupiditate, praesentium dolorum. Harum voluptas, recusandae
                illo, modi cupiditate ut ex optio mollitia voluptate fuga
                impedit aperiam saepe veniam dolore consequuntur, nemo
                explicabo. Molestiae magni, error deserunt sint sunt optio
                corrupti? Esse animi itaque, velit voluptatibus in impedit
                facilis libero, fuga ea sint porro voluptates quis? Voluptas
                facere soluta minima, dolorum incidunt dolor in perferendis
                repellendus accusamus fugiat saepe assumenda ipsam repudiandae
                nisi, non, sapiente illum inventore?
              </Text>
            </VAccordionContent>
          </VAccordionItem>
        </VAccordion>
      </View>
    </View>
  );
};

export default ExampleAccordion;
