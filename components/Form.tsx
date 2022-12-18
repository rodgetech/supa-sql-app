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
  initialValues?: FormValues;
};

export default function QueryForm(props: Props) {
  const defaultValues = props.initialValues || {
    table: [{ name: "", fields: "" }],
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    defaultValues,
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "table",
    control,
  });

  const onSubmit = (data: FormValues) => {
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
          <div key={field.id} className="border-b border-zinc-700">
            <div className="flex-1 space-y-4">
              <div>
                <div className="mb-2 text-zinc-300">Table name</div>
                <input
                  {...register(`table.${index}.name` as const, {
                    required: true,
                  })}
                  className="w-full resize-none rounded-md border border-zinc-700 bg-zinc-800 p-2 text-white outline-none"
                  placeholder="Table name"
                />
              </div>
              <div>
                <div className="mb-2 text-zinc-300">Fields</div>
                <input
                  {...register(`table.${index}.fields` as const, {
                    required: true,
                  })}
                  className="w-full resize-none rounded-md border border-zinc-700 bg-zinc-800 p-2 text-white outline-none"
                  placeholder="Table fields"
                />
                <small className="text-zinc-500">
                  Comma separated fields: id, user_id, created_at, etc
                </small>
              </div>
            </div>
            <div className="pb-2 text-zinc-400">
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
          <div className="mb-2 text-zinc-300">Query instructions</div>
          <textarea
            {...register("details", {
              required: true,
            })}
            rows={3}
            className="w-full resize-none rounded-md border border-zinc-700 bg-zinc-800 p-2 text-white outline-none"
            placeholder="Add query details, be as specific as possible"
          />
        </div>
      </div>

      <div className="flex items-center space-x-5">
        {props.initialValues && isDirty && (
          <button
            type="submit"
            className="rounded-lg bg-purple-800 px-8 py-2.5 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-1 focus:ring-zinc-600"
          >
            Show me the Sql
          </button>
        )}

        {!props.initialValues && (
          <button
            type="submit"
            className="rounded-lg bg-purple-800 px-8 py-2.5 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-1 focus:ring-zinc-600"
          >
            Show me the Sql
          </button>
        )}

        {!props.initialValues && (
          <p
            className="cursor-pointer text-zinc-500 hover:text-white"
            onClick={handleReset}
          >
            Reset
          </p>
        )}
      </div>
    </form>
  );
}
