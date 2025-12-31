import { Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  VForm,
  VFormField,
  VFormItem,
  VFormLabel,
  VFormControl,
  VFormDescription,
  VFormMessage,
  VInput,
  VTextarea,
  VButton,
  VPasswordInput,
} from 'v-pack';
import { Mail, Lock, User, X, Eye, EyeOff } from 'lucide-react-native';
import tw from 'twrnc';

// Schema validation
const formSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters'),
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  bio: z.string().max(200, 'Bio must be less than 200 characters').optional(),
});

type FormValues = z.infer<typeof formSchema>;

function ExampleForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    // reValidateMode: 'onSubmit',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      bio: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <>
      <View
        style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
      >
        <Text
          style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
        >
          Input
        </Text>
        <View style={tw`p-4 gap-3`}>
          <VForm form={form}>
            {/* Username - Outline */}
            <VFormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <VFormItem>
                  <VFormLabel>Username</VFormLabel>
                  <VFormControl>
                    <VInput
                      placeholder="Enter username"
                      variant="outline"
                      prefix={<User size={20} color="#6b7280" />}
                      suffix={
                        field.value ? (
                          <X
                            size={18}
                            color="#6b7280"
                            onPress={() => form.setValue('username', '')}
                          />
                        ) : null
                      }
                      {...field}
                      onChangeText={field.onChange}
                    />
                  </VFormControl>
                  <VFormDescription>
                    This is your public display name.
                  </VFormDescription>
                  <VFormMessage />
                </VFormItem>
              )}
            />

            {/* Email - Underline */}
            <VFormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <VFormItem>
                  <VFormLabel>Email</VFormLabel>
                  <VFormControl>
                    <VInput
                      placeholder="Enter email"
                      variant="underline"
                      prefix={<Mail size={20} color="#6b7280" />}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      {...field}
                      onChangeText={field.onChange}
                    />
                  </VFormControl>
                  <VFormMessage />
                </VFormItem>
              )}
            />

            {/* Password - Outline */}
            <VFormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <VFormItem>
                  <VFormLabel>Password</VFormLabel>
                  <VFormControl>
                    <VPasswordInput
                      placeholder="Enter password"
                      variant="outline"
                      prefix={<Lock size={20} color="#6b7280" />}
                      IconShow={Eye}
                      IconHide={EyeOff}
                      iconColor="#6b7280"
                      value={field.value}
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                    />
                  </VFormControl>
                  <VFormMessage />
                </VFormItem>
              )}
            />

            {/* Bio - Textarea Outline */}
            <VFormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <VFormItem>
                  <VFormLabel>Bio</VFormLabel>
                  <VFormControl>
                    <VTextarea
                      placeholder="Tell us about yourself"
                      variant="outline"
                      rows={4}
                      autoGrow
                      {...field}
                      onChangeText={field.onChange}
                    />
                  </VFormControl>
                  <VFormDescription>
                    Brief description for your profile.
                  </VFormDescription>
                  <VFormMessage />
                </VFormItem>
              )}
            />
            {/* Bio - Textarea UnderLine */}
            <VFormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <VFormItem>
                  <VFormLabel>Bio</VFormLabel>
                  <VFormControl>
                    <VTextarea
                      placeholder="Tell us about yourself"
                      variant="underline"
                      rows={4}
                      autoGrow
                      {...field}
                      onChangeText={field.onChange}
                    />
                  </VFormControl>
                  <VFormDescription>
                    Brief description for your profile.
                  </VFormDescription>
                  <VFormMessage />
                </VFormItem>
              )}
            />

            {/* Submit Button */}
            <VButton
              type="primary"
              onPress={() => form.handleSubmit(onSubmit)}
              // disabled={!form.formState.isValid}
            >
              Submit
            </VButton>
          </VForm>
        </View>
      </View>
    </>
  );
}

export default ExampleForm;
