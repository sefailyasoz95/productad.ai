import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, FileUp, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Influencer } from "@/lib/types";

interface JsonImporterProps {
	onImport: (data: Partial<Influencer>) => void;
}

const JsonImporter: React.FC<JsonImporterProps> = ({ onImport }) => {
	const [jsonInput, setJsonInput] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { toast } = useToast();

	const handleJsonInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setJsonInput(e.target.value);
		setError(null);
	};

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError(null);
		const file = e.target.files?.[0];

		if (!file) return;

		// Validate file type
		if (file.type !== "application/json" && !file.name.endsWith(".json")) {
			setError("Please upload a valid JSON file");
			return;
		}

		const reader = new FileReader();
		reader.onload = (event) => {
			try {
				const content = event.target?.result as string;
				setJsonInput(content);
			} catch (err) {
				setError("Failed to read the file");
			}
		};

		reader.onerror = () => {
			setError("Error reading file");
		};

		reader.readAsText(file);
	};

	const handleImport = () => {
		try {
			if (!jsonInput.trim()) {
				setError("Please enter or upload JSON data");
				return;
			}

			const parsedData = JSON.parse(jsonInput);

			// Basic validation that it's an influencer object
			if (!parsedData.name) {
				setError("JSON is missing required 'name' field for an influencer");
				return;
			}

			// Success! Close the dialog and pass the data back
			onImport(parsedData);
			setIsOpen(false);
			toast({
				title: "JSON imported successfully",
				description: `Data for ${parsedData.name} has been loaded into the form`,
			});

			// Reset the form
			setJsonInput("");
			setError(null);
		} catch (err) {
			setError("Invalid JSON format. Please check your input.");
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant='outline' className='gap-2'>
					<FileUp className='h-4 w-4' />
					Import JSON
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-lg'>
				<DialogHeader>
					<DialogTitle>Import Influencer Data</DialogTitle>
				</DialogHeader>

				<div className='space-y-4 py-2'>
					<div className='space-y-2'>
						<Label htmlFor='json-input'>Paste JSON</Label>
						<Textarea
							id='json-input'
							value={jsonInput}
							onChange={handleJsonInputChange}
							rows={10}
							placeholder='{"name": "Influencer Name", "age": 25, ...}'
							className='font-mono text-sm'
						/>
					</div>

					<div className='flex items-center'>
						<div className='flex-grow border-t border-border'></div>
						<span className='mx-4 text-muted-foreground text-sm'>OR</span>
						<div className='flex-grow border-t border-border'></div>
					</div>

					<div>
						<Button variant='outline' className='w-full gap-2' onClick={() => fileInputRef.current?.click()}>
							<Upload className='h-4 w-4' />
							Upload JSON File
						</Button>
						<Input
							type='file'
							ref={fileInputRef}
							accept='.json,application/json'
							className='hidden'
							onChange={handleFileUpload}
						/>
					</div>

					{error && (
						<div className='bg-destructive/10 text-destructive p-3 rounded-md flex items-start'>
							<AlertCircle className='h-5 w-5 mr-2 mt-0.5 flex-shrink-0' />
							<span>{error}</span>
						</div>
					)}

					<div className='flex justify-end gap-2 pt-2'>
						<Button variant='outline' onClick={() => setIsOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleImport}>Import Data</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default JsonImporter;
