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
  onReset: () => void;
};

export default function QueryForm(props: Props) {
  const {
    register,
    control,
    handleSubmit,
    reset,
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

  const handleReset = () => {
    reset();
    props.onReset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <div className="space-y-5">
        <h2 className="text-xl text-white">
          1. Please describe your{" "}
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
            <div className="flex-1 space-y-4">
              <div>
                <input
                  {...register(`table.${index}.name` as const, {
                    required: true,
                  })}
                  className="w-full resize-none border-b border-zinc-800 bg-zinc-900 py-2 text-white outline-none"
                  placeholder="Table name"
                />
              </div>
              <div>
                <input
                  {...register(`table.${index}.fields` as const, {
                    required: true,
                  })}
                  className="w-full resize-none border-b border-zinc-800 bg-zinc-900 py-2 text-white outline-none"
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
            className="rounded-lg bg-zinc-800  px-5 py-1 text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-600"
          >
            Add table
          </button>
        </div>
      </div>
      <div className="space-y-5">
        <h2 className="text-xl text-white">
          2. What would you like your{" "}
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
            className="w-full resize-none border-b border-zinc-800 bg-zinc-900 py-2 text-white outline-none"
            placeholder="Add query details, be as specific as possible"
          />
        </div>
      </div>

      <div className="flex items-center space-x-5">
        <button
          type="submit"
          className="rounded-lg bg-purple-800  px-8 py-2.5 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-1 focus:ring-zinc-600"
        >
          Show me the Sql
        </button>
        <p
          className="cursor-pointer text-zinc-500 hover:text-white"
          onClick={handleReset}
        >
          Reset
        </p>
      </div>
    </form>
  );
}
