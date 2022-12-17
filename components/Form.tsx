import { useForm, useFieldArray, useWatch, Control } from "react-hook-form";

export type FormValues = {
  table: {
    name: string;
    fields: string;
  }[];
  details: string;
};

type Props = {
  onSubmit: (value: FormValues) => void;
};

export default function QueryForm(props: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      table: [{ name: "", fields: "" }],
    },
    mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({
    name: "table",
    control,
  });
  const onSubmit = (data: FormValues) => {
    console.log(data);
    props.onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <div className="space-y-5">
        <h2 className="text-white text-xl">
          Please describe your{" "}
          <span className="underline decoration-purple-500 underline-offset-4">
            tables
          </span>{" "}
          and{" "}
          <span className="underline decoration-purple-500 underline-offset-4">
            fields
          </span>
        </h2>
        {fields.map((field, index) => (
          <div key={field.id} className="flex space-x-5">
            <div className="space-y-4 flex-1">
              <div>
                <input
                  {...register(`table.${index}.name` as const, {
                    required: true,
                  })}
                  className="w-full bg-zinc-900 text-white outline-none resize-none border-b border-zinc-800 py-2"
                  placeholder="Table name"
                />
              </div>
              <div>
                <input
                  {...register(`table.${index}.fields` as const, {
                    required: true,
                  })}
                  className="w-full bg-zinc-900 text-white outline-none resize-none border-b border-zinc-800 py-2"
                  placeholder="Table fields"
                />
                <small className="text-zinc-500">
                  Comma separated fields: id, user_id, created_at, etc
                </small>
              </div>
            </div>
            <div className="flex items-center text-zinc-500 ">
              <p className="cursor-pointer" onClick={() => remove(index)}>
                remove
              </p>
            </div>
          </div>
        ))}

        <div>
          <button
            onClick={() => append({ name: "", fields: "" })}
            type="button"
            className="text-white bg-zinc-800  hover:bg-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-600 font-medium rounded-lg text-sm px-5 py-1"
          >
            Add table
          </button>
        </div>
      </div>
      <div className="space-y-5">
        <h2 className="text-white text-xl">
          What would you like your{" "}
          <span className="underline decoration-purple-500 underline-offset-4">
            query
          </span>{" "}
          to do?
        </h2>
        <div>
          <textarea
            {...register("details", {
              required: true,
            })}
            rows={3}
            className="w-full bg-zinc-900 text-white outline-none resize-none border-b border-zinc-800 py-2"
            placeholder="Add query details"
          />
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-purple-800  hover:bg-purple-700 focus:outline-none focus:ring-1 focus:ring-zinc-600 font-medium rounded-lg text-sm px-8 py-2.5"
      >
        Show me the Sql
      </button>
    </form>
  );
}
